import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./model-viewer.css";

const ModelViewer = forwardRef(({ src, format, preview = false, onInfo, onSnapshot }, ref) => {
  const host = useRef(null),
    api = useRef({ reset() {}, zoom() {} }),
    infoCallback = useRef(onInfo),
    snapshotCallback = useRef(onSnapshot);
  const [status, setStatus] = useState("loading");
  infoCallback.current = onInfo;
  snapshotCallback.current = onSnapshot;
  useImperativeHandle(
    ref,
    () => ({
      reset: () => api.current.reset(),
      zoom: (amount) => api.current.zoom(amount),
    }),
    [],
  );
  useEffect(() => {
    let disposed = false,
      frame = 0,
      observer,
      resizeObserver,
      renderer,
      scene,
      camera,
      controls,
      model;
    const node = host.current,
      target = { x: 0.12, y: -0.5 },
      current = { x: 0.12, y: -0.5 };
    let visible = false,
      baseCamera = null,
      captured = false;
    const start = async () => {
      try {
        const THREE = await import("three");
        if (disposed) return;
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: Boolean(snapshotCallback.current),
          powerPreference: "high-performance",
        });
        renderer.setPixelRatio(
          Math.min(devicePixelRatio || 1, preview ? 1.15 : 1.5),
        );
        renderer.setSize(node.clientWidth, node.clientHeight, false);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;
        renderer.setClearColor(0x080909, 0);
        node.appendChild(renderer.domElement);
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
          35,
          node.clientWidth / Math.max(node.clientHeight, 1),
          0.01,
          1000,
        );
        scene.add(new THREE.HemisphereLight(0xd9e2ef, 0x17120d, 2.2));
        const key = new THREE.DirectionalLight(0xffe2b8, 3.1);
        key.position.set(4, 6, 5);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0x6f91bd, 2);
        rim.position.set(-5, 2, -4);
        scene.add(rim);
        const extension = (format || src.split("?")[0].split(".").pop()).toLowerCase();
        let loaded;
        if (extension === "fbx") {
          const { FBXLoader } = await import("three/examples/jsm/loaders/FBXLoader.js");
          loaded = await new FBXLoader().loadAsync(src);
        } else if (extension === "obj") {
          const { OBJLoader } = await import("three/examples/jsm/loaders/OBJLoader.js");
          loaded = await new OBJLoader().loadAsync(src);
        } else {
          const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
          const { MeshoptDecoder } = await import("three/examples/jsm/libs/meshopt_decoder.module.js");
          const loader = new GLTFLoader();
          loader.setMeshoptDecoder(MeshoptDecoder);
          loaded = await loader.loadAsync(src);
        }
        if (disposed) return;
        model = loaded.scene || loaded;
        scene.add(model);
        const box = new THREE.Box3().setFromObject(model),
          size = box.getSize(new THREE.Vector3()),
          center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        const radius = Math.max(size.x, size.y, size.z) / 2 || 1,
          distance =
            (radius / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) *
            1.18;
        camera.position.set(distance * 0.72, distance * 0.34, distance);
        camera.lookAt(0, 0, 0);
        camera.near = Math.max(0.001, distance / 100);
        camera.far = distance * 100;
        camera.updateProjectionMatrix();
        baseCamera = camera.position.clone();
        const materials = new Map(),
          textures = [],
          textureKeys = [
            "map",
            "normalMap",
            "roughnessMap",
            "metalnessMap",
            "aoMap",
            "emissiveMap",
            "alphaMap",
          ];
        let vertices = 0,
          triangles = 0,
          uvChannels = 0;
        model.traverse((object) => {
          if (!object.isMesh) return;
          const geometry = object.geometry;
          vertices += geometry.attributes.position?.count || 0;
          triangles +=
            (geometry.index?.count ||
              geometry.attributes.position?.count ||
              0) / 3;
          uvChannels = Math.max(
            uvChannels,
            geometry.attributes.uv1 || geometry.attributes.uv2
              ? 2
              : geometry.attributes.uv
                ? 1
                : 0,
          );
          (Array.isArray(object.material) ? object.material : [object.material])
            .filter(Boolean)
            .forEach((material) => {
              materials.set(material.uuid, material);
              textureKeys.forEach((key) => {
                const texture = material[key];
                if (
                  texture &&
                  !textures.some((item) => item.uuid === texture.uuid)
                ) {
                  const image = texture.image;
                  textures.push({
                    uuid: texture.uuid,
                    type: key,
                    name:
                      texture.name ||
                      image?.currentSrc?.split("/").pop()?.split("?")[0] ||
                      "未命名贴图",
                    width: image?.width || image?.videoWidth || 0,
                    height: image?.height || image?.videoHeight || 0,
                  });
                }
              });
            });
        });
        infoCallback.current?.({
          vertices,
          triangles: Math.round(triangles),
          uvChannels,
          materials: [...materials.values()].map((m) => ({
            name: m.name || "未命名材质",
            type: m.type,
            roughness: m.roughness,
            metalness: m.metalness,
          })),
          textures,
        });
        if (!preview) {
          const { OrbitControls } =
            await import("three/examples/jsm/controls/OrbitControls.js");
          if (disposed) return;
          controls = new OrbitControls(camera, renderer.domElement);
          controls.enableDamping = true;
          controls.dampingFactor = 0.075;
          controls.enablePan = false;
          controls.minDistance = distance * 0.28;
          controls.maxDistance = distance * 4;
          controls.target.set(0, 0, 0);
          controls.update();
        }
        api.current = {
          reset() {
            if (preview) {
              target.x = 0.12;
              target.y = -0.5;
            } else if (baseCamera) {
              camera.position.copy(baseCamera);
              controls?.target.set(0, 0, 0);
              controls?.update();
            }
          },
          zoom(amount) {
            if (!camera) return;
            camera.position.multiplyScalar(amount > 0 ? 0.86 : 1.16);
            controls?.update();
          },
        };
        setStatus("ready");
        const render = () => {
          if (disposed || !visible) {
            frame = 0;
            return;
          }
          if (preview && model) {
            current.x += (target.x - current.x) * 0.065;
            current.y += (target.y - current.y) * 0.065;
            model.rotation.x = current.x;
            model.rotation.y = current.y;
          } else controls?.update();
          renderer.render(scene, camera);
          if (!captured && snapshotCallback.current) {
            captured = true;
            try {
              snapshotCallback.current(renderer.domElement.toDataURL("image/webp", 0.78));
            } catch { /* 静态缩略图生成失败时保留 3D 占位 */ }
          }
          frame = requestAnimationFrame(render);
        };
        const activate = (next) => {
          visible = next && !document.hidden;
          if (visible && !frame) frame = requestAnimationFrame(render);
          if (!visible && frame) {
            cancelAnimationFrame(frame);
            frame = 0;
          }
        };
        observer = new IntersectionObserver(
          ([entry]) => activate(entry.isIntersecting),
          { rootMargin: "120px" },
        );
        observer.observe(node);
        const resize = () => {
          if (!renderer || !camera) return;
          const w = node.clientWidth,
            h = Math.max(node.clientHeight, 1);
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(node);
      } catch (error) {
        if (!disposed) {
          setStatus("error");
          console.error("Model preview failed", error);
        }
      }
    };
    const pointer = (e) => {
      if (!preview) return;
      const r = node.getBoundingClientRect();
      target.y = ((e.clientX - r.left) / r.width - 0.5) * Math.PI * 1.25;
      target.x = ((e.clientY - r.top) / r.height - 0.5) * -0.65;
    };
    const leave = () => {
      if (preview) {
        target.x = 0.12;
        target.y = -0.5;
      }
    };
    node.addEventListener("pointermove", pointer, { passive: true });
    node.addEventListener("pointerleave", leave);
    start();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      resizeObserver?.disconnect();
      controls?.dispose();
      renderer?.dispose();
      renderer?.domElement?.remove();
      node.removeEventListener("pointermove", pointer);
      node.removeEventListener("pointerleave", leave);
      model?.traverse((o) => {
        o.geometry?.dispose?.();
        (Array.isArray(o.material) ? o.material : [o.material])
          .filter(Boolean)
          .forEach((m) => {
            Object.values(m).forEach((v) => v?.isTexture && v.dispose());
            m.dispose?.();
          });
      });
    };
  }, [src, format, preview]);
  return (
    <div
      ref={host}
      className={`model-viewer ${preview ? "is-preview" : "is-detail"}`}
    >
      <span className={`model-status ${status}`}>
        {status === "loading"
          ? "加载模型中"
          : status === "error"
            ? "模型加载失败"
            : ""}
      </span>
      {preview && <span className="model-badge">3D</span>}
    </div>
  );
});
ModelViewer.displayName = "ModelViewer";
export default ModelViewer;

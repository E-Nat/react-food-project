import React, { useEffect, useRef } from 'react';
import './Velaris.css';

// Utility to convert hex color (#RRGGBB) to normalized RGB float array [r, g, b]
const hexToRgb = (hex) => {
  const cleanHex = hex.replace('#', '');
  const bigint = parseInt(cleanHex, 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;
  return [r, g, b];
};

const VERTEX_SHADER_SOURCE = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SOURCE = `
  precision highp float;
  varying vec2 v_uv;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_scroll;
  uniform vec3 u_bg;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform vec3 u_color4;

  // 2D Pseudo Random
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  // 2D Noise
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  // Fractional Brownian Motion (FBM)
  float fbm(vec2 st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 4; ++i) {
      v += a * noise(st);
      st = rot * st * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  // Procedural Twinkling Food Particle Layer
  float foodParticleField(vec2 uv, float t) {
    vec2 gridId = floor(uv);
    vec2 gridUv = fract(uv) - 0.5;
    float p = 0.0;

    // Multi-sample 3x3 neighbor grid for smooth star distribution
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 offset = vec2(float(x), float(y));
        vec2 cellId = gridId + offset;
        float r = random(cellId);

        // Filter sparse particles
        if (r > 0.62) {
          // Drifting particle center inside cell
          vec2 pos = offset + vec2(
            sin(t * 0.4 + r * 6.28) * 0.35,
            cos(t * 0.3 + r * 6.28) * 0.35
          );

          float dist = length(gridUv - pos);
          // Twinkle factor
          float twinkle = sin(t * (1.2 + r * 2.0) + r * 6.28) * 0.5 + 0.5;
          float size = 0.012 + r * 0.024;
          float glow = smoothstep(size * 4.5, 0.0, dist) * (0.4 + 0.6 * twinkle);
          float core = smoothstep(size, 0.0, dist) * twinkle;

          p += (core * 1.5 + glow * 0.6) * (0.5 + 0.5 * r);
        }
      }
    }
    return p;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;
    st.x *= aspect;

    // Apply gentle mouse parallax shift & scroll barrel roll
    vec2 mouseOffset = u_mouse * 0.04;
    float angle = u_scroll * 0.15;
    mat2 scrollRot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    
    vec2 centeredSt = (st - vec2(0.5 * aspect, 0.5)) * scrollRot + vec2(0.5 * aspect, 0.5);
    vec2 dynamicSt = centeredSt + mouseOffset;

    float t = u_time * 0.30;

    // 4 Organic Wave Attractors
    vec2 p1 = vec2(0.3 * aspect + 0.22 * sin(t * 0.7), 0.7 + 0.2 * cos(t * 0.8));
    vec2 p2 = vec2(0.75 * aspect + 0.25 * cos(t * 0.6), 0.35 + 0.25 * sin(t * 0.9));
    vec2 p3 = vec2(0.2 * aspect + 0.2 * cos(t * 1.1), 0.25 + 0.2 * sin(t * 0.5));
    vec2 p4 = vec2(0.85 * aspect + 0.18 * sin(t * 0.8), 0.8 + 0.18 * cos(t * 0.6));

    // Domain Warp with FBM
    vec2 q = vec2(
      fbm(dynamicSt + vec2(t * 0.12, t * 0.07)),
      fbm(dynamicSt + vec2(-t * 0.10, t * 0.12))
    );

    vec2 r = vec2(
      fbm(dynamicSt + 1.0 * q + vec2(1.7, 9.2) + 0.12 * t),
      fbm(dynamicSt + 1.0 * q + vec2(8.3, 2.8) + 0.10 * t)
    );

    vec2 warpedSt = dynamicSt + 0.45 * r;

    // Influence weights from attractors
    float d1 = length(warpedSt - p1);
    float d2 = length(warpedSt - p2);
    float d3 = length(warpedSt - p3);
    float d4 = length(warpedSt - p4);

    float w1 = smoothstep(0.95, 0.05, d1);
    float w2 = smoothstep(1.05, 0.08, d2);
    float w3 = smoothstep(0.9, 0.05, d3);
    float w4 = smoothstep(1.0, 0.08, d4);

    // Blend base background with 4 gradient accents
    vec3 color = u_bg;
    color = mix(color, u_color1, w1 * 0.62);
    color = mix(color, u_color2, w2 * 0.58);
    color = mix(color, u_color3, w3 * 0.65);
    color = mix(color, u_color4, w4 * 0.52);

    // Add Sparkling Food Particle Universe (Layer 1: slow background sparkles)
    vec2 particleUv1 = (dynamicSt * 18.0) + vec2(t * 0.15, t * 0.08);
    float particles1 = foodParticleField(particleUv1, t);

    // Layer 2: fast floating ingredient crumbs
    vec2 particleUv2 = (dynamicSt * 28.0) - vec2(t * 0.25, t * 0.18) + mouseOffset * 2.0;
    float particles2 = foodParticleField(particleUv2, t * 1.4);

    vec3 starTint = mix(u_color4, u_color3, 0.5);
    color += (particles1 * starTint * 0.85) + (particles2 * u_color1 * 0.70);

    // Subtle film grain
    float grain = (random(st + fract(u_time * 0.01)) - 0.5) * 0.022;
    color += grain;

    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
  }
`;

const Velaris = ({ 
  bg = '#F7F4E9', 
  colors = ['#DDE6C9', '#8FA86B', '#F26B4F', '#F5C85B'], 
  mouse = { x: 0, y: 0 },
  scroll = 0,
  className = '' 
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const glRef = useRef(null);
  const uniformsRef = useRef({});
  const dynamicStateRef = useRef({ bg, colors, mouse, scroll });

  // Update cached state without recreating WebGL context
  useEffect(() => {
    dynamicStateRef.current = { bg, colors, mouse, scroll };
  }, [bg, colors, mouse, scroll]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speedFactor = prefersReducedMotion ? 0.06 : 1.0;

    // Initialize WebGL context
    const gl = canvas.getContext('webgl', { 
      alpha: false, 
      depth: false, 
      stencil: false, 
      antialias: false,
      powerPreference: 'high-performance' 
    }) || canvas.getContext('experimental-webgl');

    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }
    glRef.current = gl;

    // Helper: Compile Shader
    const createShader = (glContext, type, source) => {
      const shader = glContext.createShader(type);
      glContext.shaderSource(shader, source);
      glContext.compileShader(shader);
      if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
        console.error('Shader compile error:', glContext.getShaderInfoLog(shader));
        glContext.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Full screen quad buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const aPositionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPositionLocation);
    gl.vertexAttribPointer(aPositionLocation, 2, gl.FLOAT, false, 0, 0);

    // Locate uniforms
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uScroll = gl.getUniformLocation(program, 'u_scroll');
    const uBg = gl.getUniformLocation(program, 'u_bg');
    const uColor1 = gl.getUniformLocation(program, 'u_color1');
    const uColor2 = gl.getUniformLocation(program, 'u_color2');
    const uColor3 = gl.getUniformLocation(program, 'u_color3');
    const uColor4 = gl.getUniformLocation(program, 'u_color4');

    uniformsRef.current = {
      uResolution,
      uTime,
      uMouse,
      uScroll,
      uBg,
      uColor1,
      uColor2,
      uColor3,
      uColor4,
    };

    // Resize Handler
    const handleResize = () => {
      if (!container || !canvas || !gl) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const displayWidth = Math.floor(width * dpr);
      const displayHeight = Math.floor(height * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
        gl.uniform2f(uniformsRef.current.uResolution, displayWidth, displayHeight);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);
    handleResize();

    // Render loop
    let startTime = performance.now();
    let currentMouseX = 0;
    let currentMouseY = 0;

    const render = (now) => {
      if (!gl || gl.isContextLost()) return;

      const elapsed = (now - startTime) * 0.001 * speedFactor;
      gl.uniform1f(uniformsRef.current.uTime, elapsed);

      // Smooth mouse interpolation
      const targetMouse = dynamicStateRef.current.mouse || { x: 0, y: 0 };
      currentMouseX += (targetMouse.x - currentMouseX) * 0.08;
      currentMouseY += (targetMouse.y - currentMouseY) * 0.08;
      gl.uniform2f(uniformsRef.current.uMouse, currentMouseX, currentMouseY);

      // Scroll interpolation
      const currentScroll = dynamicStateRef.current.scroll || 0;
      gl.uniform1f(uniformsRef.current.uScroll, currentScroll);

      // Upload latest colors dynamically
      const currentBgRgb = hexToRgb(dynamicStateRef.current.bg);
      const c1 = hexToRgb(dynamicStateRef.current.colors[0] || '#DDE6C9');
      const c2 = hexToRgb(dynamicStateRef.current.colors[1] || '#8FA86B');
      const c3 = hexToRgb(dynamicStateRef.current.colors[2] || '#F26B4F');
      const c4 = hexToRgb(dynamicStateRef.current.colors[3] || '#F5C85B');

      gl.uniform3f(uniformsRef.current.uBg, currentBgRgb[0], currentBgRgb[1], currentBgRgb[2]);
      gl.uniform3f(uniformsRef.current.uColor1, c1[0], c1[1], c1[2]);
      gl.uniform3f(uniformsRef.current.uColor2, c2[0], c2[1], c2[2]);
      gl.uniform3f(uniformsRef.current.uColor3, c3[0], c3[1], c3[2]);
      gl.uniform3f(uniformsRef.current.uColor4, c4[0], c4[1], c4[2]);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    // Clean up
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      resizeObserver.disconnect();
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        gl.deleteBuffer(positionBuffer);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`velaris-canvas-container ${className}`}>
      <canvas
        ref={canvasRef}
        className="velaris-webgl-canvas"
        aria-hidden="true"
        role="presentation"
      />
    </div>
  );
};

export default Velaris;

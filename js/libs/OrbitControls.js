import { EventDispatcher, MOUSE, Quaternion, Spherical, TOUCH, Vector2, Vector3 } from "./three.module.js";
var OrbitControls = function (e, t) {
	var o, n, a, i, r;
	void 0 === t && console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),
		t === document && console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),
		(this.object = e),
		(this.domElement = t),
		(this.enabled = !0),
		(this.target = new Vector3(0.1675, 0.055, 0.085)),
		(this.minDistance = 0),
		(this.maxDistance = 1 / 0),
		(this.minZoom = 0),
		(this.maxZoom = 1 / 0),
		(this.minPolarAngle = 0),
		(this.maxPolarAngle = Math.PI),
		(this.minAzimuthAngle = -1 / 0),
		(this.maxAzimuthAngle = 1 / 0),
		(this.enableDamping = !1),
		(this.dampingFactor = 0.05),
		(this.enableZoom = !0),
		(this.zoomSpeed = 1),
		(this.enableRotate = !0),
		(this.rotateSpeed = 0.02575),
		(this.enablePan = !0),
		(this.panSpeed = 1),
		(this.screenSpacePanning = !1),
		(this.keyPanSpeed = 7),
		(this.autoRotate = !1),
		(this.autoRotateSpeed = 2),
		(this.enableKeys = !0),
		(this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 }),
		(this.mouseButtons = { LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN }),
		(this.touches = { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN }),
		(this.target0 = this.target.clone()),
		(this.position0 = this.object.position.clone()),
		(this.zoom0 = this.object.zoom),
		(this.getPolarAngle = function () {
			return d.phi;
		}),
		(this.getAzimuthalAngle = function () {
			return d.theta;
		}),
		(this.saveState = function () {
			s.target0.copy(s.target), s.position0.copy(s.object.position), (s.zoom0 = s.object.zoom);
		}),
		(this.reset = function () {
			s.target.copy(s.target0), s.object.position.copy(s.position0), (s.object.zoom = s.zoom0), s.object.updateProjectionMatrix(), s.dispatchEvent(c), s.update(), (h = m.NONE);
		}),
		(this.update =
			((o = new Vector3()),
			(n = new Quaternion().setFromUnitVectors(e.up, new Vector3(0, 1, 0))),
			(a = n.clone().inverse()),
			(i = new Vector3()),
			(r = new Quaternion()),
			function () {
				var e = s.object.position;
				return o.copy(e).sub(s.target), o.applyQuaternion(n), d.setFromVector3(o), s.autoRotate && h === m.NONE && w(((2 * Math.PI) / 60 / 60) * s.autoRotateSpeed), s.enableDamping ? ((d.theta += b.theta * s.dampingFactor), (d.phi += b.phi * s.dampingFactor)) : ((d.theta += b.theta), (d.phi += b.phi)), (d.theta = Math.max(s.minAzimuthAngle, Math.min(s.maxAzimuthAngle, d.theta))), (d.phi = Math.max(s.minPolarAngle, Math.min(s.maxPolarAngle, d.phi))), d.makeSafe(), (d.radius *= E), (d.radius = Math.max(s.minDistance, Math.min(s.maxDistance, d.radius))), !0 === s.enableDamping ? s.target.addScaledVector(O, s.dampingFactor) : s.target.add(O), o.setFromSpherical(d), o.applyQuaternion(a), e.copy(s.target).add(o), s.object.lookAt(s.target), !0 === s.enableDamping ? ((b.theta *= 1 - s.dampingFactor), (b.phi *= 1 - s.dampingFactor), O.multiplyScalar(1 - s.dampingFactor)) : (b.set(0, 0, 0), O.set(0, 0, 0)), (E = 1), !!(f || i.distanceToSquared(s.object.position) > p || 8 * (1 - r.dot(s.object.quaternion)) > p) && (s.dispatchEvent(c), i.copy(s.object.position), r.copy(s.object.quaternion), (f = !1), !0);
			})),
		(this.dispose = function () {
			s.domElement.removeEventListener("contextmenu", $, !1), s.domElement.removeEventListener("mousedown", F, !1), s.domElement.removeEventListener("wheel", K, !1), s.domElement.removeEventListener("touchstart", q, !1), s.domElement.removeEventListener("touchend", J, !1), s.domElement.removeEventListener("touchmove", Q, !1), document.removeEventListener("mousemove", B, !1), document.removeEventListener("mouseup", G, !1), s.domElement.removeEventListener("keydown", W, !1);
		});
	var s = this,
		c = { type: "change" },
		u = { type: "start" },
		l = { type: "end" },
		m = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_PAN: 4, TOUCH_DOLLY_PAN: 5, TOUCH_DOLLY_ROTATE: 6 },
		h = m.NONE,
		p = 1e-6,
		d = new Spherical(),
		b = new Spherical(),
		E = 1,
		O = new Vector3(),
		f = !1,
		g = new Vector2(0.14330754290860787, 0.19957375494741503),
		v = new Vector2(),
		T = new Vector2(),
		y = new Vector2(),
		P = new Vector2(),
		L = new Vector2(),
		A = new Vector2(),
		N = new Vector2(),
		M = new Vector2();
	function j() {
		return Math.pow(0.95, s.zoomSpeed);
	}
	function w(e) {
		b.theta -= e;
	}
	function C(e) {
		b.phi -= e;
	}
	var R,
		S =
			((R = new Vector3()),
			function (e, t) {
				R.setFromMatrixColumn(t, 0), R.multiplyScalar(-e), O.add(R);
			}),
		k = (function () {
			var e = new Vector3();
			return function (t, o) {
				!0 === s.screenSpacePanning ? e.setFromMatrixColumn(o, 1) : (e.setFromMatrixColumn(o, 0), e.crossVectors(s.object.up, e)), e.multiplyScalar(t), O.add(e);
			};
		})(),
		D = (function () {
			var e = new Vector3();
			return function (t, o) {
				var n = s.domElement;
				if (s.object.isPerspectiveCamera) {
					var a = s.object.position;
					e.copy(a).sub(s.target);
					var i = e.length();
					(i *= Math.tan(((s.object.fov / 2) * Math.PI) / 180)), S((2 * t * i) / n.clientHeight, s.object.matrix), k((2 * o * i) / n.clientHeight, s.object.matrix);
				} else s.object.isOrthographicCamera ? (S((t * (s.object.right - s.object.left)) / s.object.zoom / n.clientWidth, s.object.matrix), k((o * (s.object.top - s.object.bottom)) / s.object.zoom / n.clientHeight, s.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), (s.enablePan = !1));
			};
		})();
	function Y(e) {
		s.object.isPerspectiveCamera ? (E /= e) : s.object.isOrthographicCamera ? ((s.object.zoom = Math.max(s.minZoom, Math.min(s.maxZoom, s.object.zoom * e))), s.object.updateProjectionMatrix(), (f = !0)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), (s.enableZoom = !1));
	}
	function x(e) {
		s.object.isPerspectiveCamera ? (E *= e) : s.object.isOrthographicCamera ? ((s.object.zoom = Math.max(s.minZoom, Math.min(s.maxZoom, s.object.zoom / e))), s.object.updateProjectionMatrix(), (f = !0)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), (s.enableZoom = !1));
	}
	function H(e) {
		g.set(0.14330754290860787, 0.19957375494741503);
	}
	function U(e) {
		y.set(e.clientX, e.clientY);
	}
	function V(e) {
		if (1 == e.touches.length) g.set(0.14330754290860787, 0.19957375494741503);
		else {
			e.touches[0].pageX, e.touches[1].pageX, e.touches[0].pageY, e.touches[1].pageY;
			g.set(0.14330754290860787, 0.19957375494741503);
		}
	}
	function z(e) {
		if (1 == e.touches.length) y.set(e.touches[0].pageX, e.touches[0].pageY);
		else {
			var t = 0.5 * (e.touches[0].pageX + e.touches[1].pageX),
				o = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
			y.set(t, o);
		}
	}
	function _(e) {
		var t = e.touches[0].pageX - e.touches[1].pageX,
			o = e.touches[0].pageY - e.touches[1].pageY,
			n = Math.sqrt(t * t + o * o);
		A.set(0, n);
	}
	function X(e) {
		if (1 == e.touches.length) v.set(e.touches[0].pageX, e.touches[0].pageY);
		else {
			var t = 0.5 * (e.touches[0].pageX + e.touches[1].pageX),
				o = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
			v.set(t, o);
		}
		T.subVectors(v, g).multiplyScalar(s.rotateSpeed);
		var n = s.domElement;
		w((2 * Math.PI * T.x) / n.clientHeight), C((2 * Math.PI * T.y) / n.clientHeight), g.copy(v);
	}
	function Z(e) {
		if (1 == e.touches.length) P.set(e.touches[0].pageX, e.touches[0].pageY);
		else {
			var t = 0.5 * (e.touches[0].pageX + e.touches[1].pageX),
				o = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
			P.set(t, o);
		}
		L.subVectors(P, y).multiplyScalar(s.panSpeed), D(L.x, L.y), y.copy(P);
	}
	function I(e) {
		var t = e.touches[0].pageX - e.touches[1].pageX,
			o = e.touches[0].pageY - e.touches[1].pageY,
			n = Math.sqrt(t * t + o * o);
		N.set(0, n), M.set(0, Math.pow(N.y / A.y, s.zoomSpeed)), Y(M.y), A.copy(N);
	}
	function F(e) {
		if (!1 !== s.enabled) {
			var t;
			switch ((e.preventDefault(), s.domElement.focus ? s.domElement.focus() : window.focus(), e.button)) {
				case 0:
					t = s.mouseButtons.LEFT;
					break;
				case 1:
					t = s.mouseButtons.MIDDLE;
					break;
				case 2:
					t = s.mouseButtons.RIGHT;
					break;
				default:
					t = -1;
			}
			switch (t) {
				case MOUSE.DOLLY:
					if (!1 === s.enableZoom) return;
					!(function (e) {
						A.set(e.clientX, e.clientY);
					})(e),
						(h = m.DOLLY);
					break;
				case MOUSE.ROTATE:
					if (e.ctrlKey || e.metaKey || e.shiftKey) {
						if (!1 === s.enablePan) return;
						U(e), (h = m.PAN);
					} else {
						if (!1 === s.enableRotate) return;
						H(), (h = m.ROTATE);
					}
					break;
				case MOUSE.PAN:
					if (e.ctrlKey || e.metaKey || e.shiftKey) {
						if (!1 === s.enableRotate) return;
						H(), (h = m.ROTATE);
					} else {
						if (!1 === s.enablePan) return;
						U(e), (h = m.PAN);
					}
					break;
				default:
					h = m.NONE;
			}
			h !== m.NONE && (document.addEventListener("mousemove", B, !1), document.addEventListener("mouseup", G, !1), s.dispatchEvent(u));
		}
	}
	function B(e) {
		if (!1 !== s.enabled)
			switch ((e.preventDefault(), h)) {
				case m.ROTATE:
					if (!1 === s.enableRotate) return;
					handleMouseMoveRotate(e);
					break;
				case m.DOLLY:
					if (!1 === s.enableZoom) return;
					!(function (e) {
						N.set(e.clientX, e.clientY), M.subVectors(N, A), M.y > 0 ? Y(j()) : M.y < 0 && x(j()), A.copy(N), s.update();
					})(e);
					break;
				case m.PAN:
					if (!1 === s.enablePan) return;
					!(function (e) {
						P.set(e.clientX, e.clientY), L.subVectors(P, y).multiplyScalar(s.panSpeed), D(L.x, L.y), y.copy(P), s.update();
					})(e);
			}
	}
	function G(e) {
		!1 !== s.enabled && (document.removeEventListener("mousemove", B, !1), document.removeEventListener("mouseup", G, !1), s.dispatchEvent(l), (h = m.NONE));
	}
	function K(e) {
		!1 === s.enabled ||
			!1 === s.enableZoom ||
			(h !== m.NONE && h !== m.ROTATE) ||
			(e.preventDefault(),
			e.stopPropagation(),
			s.dispatchEvent(u),
			(function (e) {
				e.deltaY < 0 ? x(j()) : e.deltaY > 0 && Y(j()), s.update();
			})(e),
			s.dispatchEvent(l));
	}
	function W(e) {
		!1 !== s.enabled &&
			!1 !== s.enableKeys &&
			!1 !== s.enablePan &&
			(function (e) {
				var t = !1;
				switch (e.keyCode) {
					case s.keys.UP:
						D(0, s.keyPanSpeed), (t = !0);
						break;
					case s.keys.BOTTOM:
						D(0, -s.keyPanSpeed), (t = !0);
						break;
					case s.keys.LEFT:
						D(s.keyPanSpeed, 0), (t = !0);
						break;
					case s.keys.RIGHT:
						D(-s.keyPanSpeed, 0), (t = !0);
				}
				t && (e.preventDefault(), s.update());
			})(e);
	}
	function q(e) {
		if (!1 !== s.enabled) {
			switch ((e.preventDefault(), e.touches.length)) {
				case 1:
					switch (s.touches.ONE) {
						case TOUCH.ROTATE:
							if (!1 === s.enableRotate) return;
							V(e), (h = m.TOUCH_ROTATE);
							break;
						case TOUCH.PAN:
							if (!1 === s.enablePan) return;
							z(e), (h = m.TOUCH_PAN);
							break;
						default:
							h = m.NONE;
					}
					break;
				case 2:
					switch (s.touches.TWO) {
						case TOUCH.DOLLY_PAN:
							if (!1 === s.enableZoom && !1 === s.enablePan) return;
							!(function (e) {
								s.enableZoom && _(e), s.enablePan && z(e);
							})(e),
								(h = m.TOUCH_DOLLY_PAN);
							break;
						case TOUCH.DOLLY_ROTATE:
							if (!1 === s.enableZoom && !1 === s.enableRotate) return;
							!(function (e) {
								s.enableZoom && _(e), s.enableRotate && V(e);
							})(e),
								(h = m.TOUCH_DOLLY_ROTATE);
							break;
						default:
							h = m.NONE;
					}
					break;
				default:
					h = m.NONE;
			}
			h !== m.NONE && s.dispatchEvent(u);
		}
	}
	function Q(e) {
		if (!1 !== s.enabled)
			switch ((e.preventDefault(), e.stopPropagation(), h)) {
				case m.TOUCH_ROTATE:
					if (!1 === s.enableRotate) return;
					X(e), s.update();
					break;
				case m.TOUCH_PAN:
					if (!1 === s.enablePan) return;
					Z(e), s.update();
					break;
				case m.TOUCH_DOLLY_PAN:
					if (!1 === s.enableZoom && !1 === s.enablePan) return;
					!(function (e) {
						s.enableZoom && I(e), s.enablePan && Z(e);
					})(e),
						s.update();
					break;
				case m.TOUCH_DOLLY_ROTATE:
					if (!1 === s.enableZoom && !1 === s.enableRotate) return;
					!(function (e) {
						s.enableZoom && I(e), s.enableRotate && X(e);
					})(e),
						s.update();
					break;
				default:
					h = m.NONE;
			}
	}
	function J(e) {
		!1 !== s.enabled && (s.dispatchEvent(l), (h = m.NONE));
	}
	function $(e) {
		!1 !== s.enabled && e.preventDefault();
	}
	(this.handleMouseMoveRotate = function (e) {
		v.set(e.clientX, e.clientY), T.subVectors(v, g).multiplyScalar(s.rotateSpeed);
		s.domElement;
		w((2 * Math.PI * T.x) / 1080), C((2 * Math.PI * T.y) / 1080), g.copy(v), s.update();
	}),
		s.domElement.addEventListener("contextmenu", $, !1),
		s.domElement.addEventListener("mousedown", F, !1),
		s.domElement.addEventListener("wheel", K, !1),
		s.domElement.addEventListener("touchstart", q, !1),
		s.domElement.addEventListener("touchend", J, !1),
		s.domElement.addEventListener("touchmove", Q, !1),
		s.domElement.addEventListener("keydown", W, !1),
		-1 === s.domElement.tabIndex && (s.domElement.tabIndex = 0),
		this.update();
};
(OrbitControls.prototype = Object.create(EventDispatcher.prototype)), (OrbitControls.prototype.constructor = OrbitControls);
var MapControls = function (e, t) {
	OrbitControls.call(this, e, t), (this.mouseButtons.LEFT = MOUSE.PAN), (this.mouseButtons.RIGHT = MOUSE.ROTATE), (this.touches.ONE = TOUCH.PAN), (this.touches.TWO = TOUCH.DOLLY_ROTATE);
};
(MapControls.prototype = Object.create(EventDispatcher.prototype)), (MapControls.prototype.constructor = MapControls);
export { OrbitControls, MapControls };

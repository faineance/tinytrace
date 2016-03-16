const AMBIENT = 0.1
const GAMMA_CORRECTION = 1 / 2.2

const vec = (x, y, z) => (x, y, z)

const dot = (x, y, z) => (w, p, r) => x * w + y * p + z * r

const cross = (x, y, z) => (w, p, r) => (y * r - z * p, z * p - x * r, x * p - y * p)

const len_squared = (x, y, z) => x ^ 2 + y ^ 2 + z ^ 2

const len = v => Math.sqrt(len_squared(v))

const norm = (x, y, z) => {
  let mag = len(x, y, z)
  return (x / mag, y / mag, z / mag)
}

const vscale = (x, y, z) => s => (x * s, y * s, z * s)

const vbop = f => (x, y, z) => (w, p, r) => (f(x, w), f(y, p), f(z, r))

const vadd = v => v1 => vbop((a, b) => a + b)(v)(v1)

const vsub = v => v1 => vbop((a, b) => a - b)(v)(v1)

const vmul = v => v1 => vbop((a, b) => a * b)(v)(v1)

const sphere = (pos, radius, colour) => { pos, radius, colour }

const ray = (origin, direction) => { origin, direction }

const camera = (origin, topleft, topright, bottomleft) => {
  return {
    origin,
    topleft,
    topright,
    bottomleft,
    xdelta: vsub(topright)(topleft),
    ydelta: vsub(bottomleft)(topleft)
  }
}

const cam_ray = (cam, x, y) => {
  let point = vadd(cam.topleft)(vscale(cam.xdelta)(x))
  let p1 = vadd(point)(vscale(cam.ydelta)(y))
  let p2 = vsub(p1)(cam.origin)
  return ray(cam.origin, norm(p2))
}

// function* pixels(width, height) {
//   for (let x = 0; x < width; x += 1) {
//     for (let y = 0; y < height; y += 1) {
//       yield (x, y)
//     }
//   }
// }

const intersect = ray => sphere => {
  let distance = vsub(ray.origin)(sphere.pos)
  let b = dot(distance)(ray.direction)
  let c = b * b - len(distance) + this.radius ^ 2
  return c > 0.0 ? -b - Math.sqrt(c) : -1.0
}

const normal = (point, pos) => norm(vsub(point)(pos))

// const hit = ray => object => distance => {
//   let origin = vadd(ray.origin)(vscale(ray.direction)(distance))
//   let normal = norm(vsub(origin)(object.pos))
//   let direction = normal // ?? till 
  
  
// }


const trace = ray => objects => light => {
  for (const object of objects) {
    let distance = intersect(ray)(object)
    let origin = vadd(ray.origin)(vscale(ray.direction)(distance))
    let normal = norm(vsub(origin)(object.pos))
    if (distance == 0) return vec(AMBIENT, AMBIENT, AMBIENT)
    if (dot(normal)(vsub(light)(point)) < 0) return vscale(object.col)(AMBIENT)


    if (distance > 0.0 && distance < Infinity) {
      let light_ray = ray(point, norm(vsub(light)(point)))
      
      // return hit(ray)(object)(distance)
    }

  }

}
const render = (ctx, width, height) => objects => {
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let colour = trace(cam_ray(x, y))(objects)
      console.log(colour) 
      // putimagedata
    }
  }
}

const gamma_correct = (colour, factor) => {
  let r, g, b = colour
  return vec(Math.pow(r / 255.0, factor) * 255, Math.pow(g / 255.0, factor) * 255, Math.pow(b / 255.0, factor) * 255)
}


const antialias = image => {
  let raw = image.getImageData()
  for (let y = 0; y < image.height; y += 1) {
    for (let x = 0; x < image.width; x += 1) {

    }
  }
}
import * as GEO from '../app/mapgeo.js';

let graphCache = null;

function buildGraph() {
  if (graphCache) return graphCache;

  const nodes = [];
  const nodeIndex = new Map();
  const edges = new Map();
  const endpoints = [];

  function nodeFor(x, y) {
    const key = `${x},${y}`;
    if (nodeIndex.has(key)) return nodeIndex.get(key);
    const index = nodes.length;
    nodes.push([x, y]);
    nodeIndex.set(key, index);
    return index;
  }

  function addEdge(a, b) {
    if (a === b) return;
    const weight = Math.hypot(nodes[a][0] - nodes[b][0], nodes[a][1] - nodes[b][1]);
    if (!edges.has(a)) edges.set(a, []);
    if (!edges.has(b)) edges.set(b, []);
    edges.get(a).push({ node: b, weight });
    edges.get(b).push({ node: a, weight });
  }

  for (const way of GEO.WEGE) {
    let previous = -1;
    way.forEach(([x, y], position) => {
      const current = nodeFor(x, y);
      if (previous >= 0) addEdge(previous, current);
      if (position === 0 || position === way.length - 1) endpoints.push(current);
      previous = current;
    });
  }

  // Kleine Lücken an abgeschnittenen oder getrennt exportierten Wegen schließen.
  for (let a = 0; a < endpoints.length; a += 1) {
    for (let b = a + 1; b < endpoints.length; b += 1) {
      const first = endpoints[a];
      const second = endpoints[b];
      const distance = Math.hypot(
        nodes[first][0] - nodes[second][0],
        nodes[first][1] - nodes[second][1]
      );
      if (distance > 0 && distance < 3) addEdge(first, second);
    }
  }

  graphCache = { nodes, edges };
  return graphCache;
}

function nearestNode(point) {
  const { nodes } = buildGraph();
  let nearest = 0;
  let nearestDistance = Infinity;

  nodes.forEach((node, index) => {
    const distance = Math.hypot(node[0] - point[0], node[1] - point[1]);
    if (distance < nearestDistance) {
      nearest = index;
      nearestDistance = distance;
    }
  });

  return nearest;
}

function shortestPath(from, to) {
  const { nodes, edges } = buildGraph();
  const start = nearestNode(from);
  const target = nearestNode(to);
  const distances = new Map([[start, 0]]);
  const previous = new Map();
  const open = new Set([start]);

  while (open.size) {
    let current = null;
    let currentDistance = Infinity;

    for (const candidate of open) {
      const distance = distances.get(candidate);
      if (distance < currentDistance) {
        current = candidate;
        currentDistance = distance;
      }
    }

    open.delete(current);
    if (current === target) break;

    for (const edge of edges.get(current) || []) {
      const nextDistance = currentDistance + edge.weight;
      if (nextDistance < (distances.get(edge.node) ?? Infinity)) {
        distances.set(edge.node, nextDistance);
        previous.set(edge.node, current);
        open.add(edge.node);
      }
    }
  }

  if (!distances.has(target)) return [from, to];

  const chain = [target];
  while (previous.has(chain[0])) chain.unshift(previous.get(chain[0]));
  return [from, ...chain.map(index => nodes[index]), to];
}

function parseDirectRoute(pathData) {
  const values = [...pathData.matchAll(/[ML]\s*(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g)];
  return values.map(match => [Number(match[1]), Number(match[2])]);
}

function toPath(points) {
  return points
    .map(([x, y], index) => `${index ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(' ');
}

function routeOnWays(stops) {
  const result = [];

  for (let index = 1; index < stops.length; index += 1) {
    const section = shortestPath(stops[index - 1], stops[index]);
    if (result.length) section.shift();
    result.push(...section);
  }

  return result;
}

function repairRoute() {
  const route = document.querySelector('.route-line');
  if (!route || route.dataset.routed === 'true') return;

  const stops = parseDirectRoute(route.getAttribute('d') || '');
  if (stops.length < 2) return;

  const routedPoints = routeOnWays(stops);
  route.setAttribute('d', toPath(routedPoints));
  route.dataset.routed = 'true';
  route.classList.add('route-on-ways');
}

const observer = new MutationObserver(repairRoute);
observer.observe(document.documentElement, { childList: true, subtree: true });
repairRoute();

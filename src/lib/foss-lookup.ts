import { FOSS_DATA, type FOSSNode } from "../data/foss-tree";

export interface FOSSDetail {
  node: FOSSNode;
  path: string[];
  categoryColor: string;
}

function walk(node: FOSSNode, path: string[], slug: string): FOSSDetail | null {
  if (node.slug === slug) {
    let color = "var(--cat-infra)";
    for (const cat of FOSS_DATA.children || []) {
      if (containsSlug(cat, slug)) {
        color = cat.color || color;
        break;
      }
    }
    return { node, path, categoryColor: color };
  }
  if (node.children) {
    for (const child of node.children) {
      const found = walk(child, [...path, node.name], slug);
      if (found) return found;
    }
  }
  return null;
}

function containsSlug(node: FOSSNode, slug: string): boolean {
  if (node.slug === slug) return true;
  return (node.children || []).some(c => containsSlug(c, slug));
}

export function findBySlug(slug: string): FOSSDetail | null {
  return walk(FOSS_DATA, [], slug);
}

export function getAllSlugs(): string[] {
  const slugs: string[] = [];
  function collect(node: FOSSNode) {
    if (node.slug) slugs.push(node.slug);
    (node.children || []).forEach(collect);
  }
  collect(FOSS_DATA);
  return slugs;
}

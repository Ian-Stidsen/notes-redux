import { Tag } from "../App";

export function tagFinder(tagIDs: string[] | undefined, tags: Tag[] | undefined) {
  if (!tagIDs || tagIDs.length === 0) return [];
  if (tags) {
    const foundTags: Tag[] = tagIDs.map(id => {
      return tags.find(tag => tag.id === id);
    }).filter(tag => tag !== undefined) as Tag[];
    return foundTags; 
  }
  return [];
}
import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityConfig } from "./config";

export const client = createClient(sanityConfig);

const builder = createImageUrlBuilder(sanityConfig);

export function urlFor(source: { asset: { _ref: string } }) {
  return builder.image(source);
}

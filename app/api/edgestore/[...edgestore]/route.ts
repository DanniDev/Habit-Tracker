import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { NextResponse } from "next/server";
const es = initEdgeStore.create();
/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket(),
  publicImages: es
    .imageBucket({
      maxSize: 1024 * 1024 * 10,
      accept: ["image/png"],
    })
    .beforeUpload(({ ctx, input, fileInfo }) => {
      // console.log("beforeUpload", ctx, input, fileInfo);
      return true; // allow upload
    }),
});
const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});
export { handler as GET, handler as POST };
/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;

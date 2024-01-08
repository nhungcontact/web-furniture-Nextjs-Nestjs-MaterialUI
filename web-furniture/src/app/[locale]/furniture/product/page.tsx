import ListProduct from "@/components/furniture/list-product/ListProduct";
import React from "react";

// export const getServerSideProps = (context) => {
//   console.log(context.query);
//   return {
//     props: {
//       title: context.query.title, //pass it to the page props
//     },
//   };
// };
// export async function getServerSideProps(context: any) {
//   console.log(context.query);
//   // returns { id: episode.itunes.episode, title: episode.title}

//   //you can make DB queries using the data in context.query
//   return {
//     props: {
//       _id: context.query._id, //pass it to the page props
//     },
//   };
// }
export default async function ProductByRoomPage() {
  return (
    <>
      <ListProduct />
    </>
  );
}

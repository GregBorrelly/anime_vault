import { fetchAnime } from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AnimeCard, { AnimeProp } from "./AnimeCard";

let page = 2;

function LoadMore() {
  const { ref, inView } = useInView();

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Add your logic here to handle changes in the `inView` variable
    if (inView) {
      // The element is in view
      fetchAnime(page).then((res) => {
        setData([...data, ...res]);
      });
      page++;
    } else {
      // The element is not in view
      console.log("Element is not in view");
    }
  }, [inView, data]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data.map((item: AnimeProp, index) => (
          <AnimeCard key={item.id} anime={item} index={index} />
        ))}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;

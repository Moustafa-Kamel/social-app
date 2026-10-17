import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function PostMedia({ image }: { image?: string }) {
  const [open, setOpen] = useState(false);

  if (!image) return null;

  return (
    <>
      <div className="max-h-155 overflow-hidden border-y border-slate-200">
        <div
          onClick={() => setOpen(true)}
          className="group relative block w-full cursor-zoom-in"
        >
          <img alt="post" className="w-full object-cover" src={image} />
          <span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
        </div>
      </div>

      {open && (
        <Lightbox
          open
          close={() => setOpen(false)}
          slides={[{ src: image }]}
          render={{ buttonPrev: () => null, buttonNext: () => null }}
          carousel={{ finite: true }}
          styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.9)" } }}
          controller={{
            closeOnBackdropClick: true,
            closeOnPullDown: true,
            closeOnPullUp: true,
          }}
        />
      )}
    </>
  );
}
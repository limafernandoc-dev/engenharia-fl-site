import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { Reveal } from "./Reveal";

const Counter = ({ to }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{value}</span>;
};

const STATS = [
  { big: "+15", counter: true, label: "anos de experiência", desc: "Em engenharia, construção civil e reformas" },
  { big: "Engenharia", counter: false, label: "especializada", desc: "Gestão técnica dedicada em cada obra" },
  { big: "Obras", counter: false, label: "corporativas", desc: "Escritórios, varejo e instituições financeiras" },
  { big: "São Paulo", counter: false, label: "e região", desc: "Atendimento na capital e Grande SP" },
];

export const Numbers = () => (
  <section
    data-testid="numbers-section"
    className="blueprint-grid-dark relative border-y border-white/10 bg-navy py-20 sm:py-24"
  >
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <Reveal>
        <p className="mb-10 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-blaze">
          04 / Engenharia FL em números
        </p>
      </Reveal>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.1}>
            <div data-testid={`stat-card-${i}`} className="border-l border-white/15 pl-6">
              <p className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {stat.counter ? (
                  <>
                    +<Counter to={15} />
                  </>
                ) : (
                  stat.big
                )}
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-blaze">{stat.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{stat.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

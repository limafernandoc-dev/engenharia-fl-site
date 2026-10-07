import { Reveal } from "./Reveal";
import { SectionHeading } from "./Section";

export const Projects = () => (
  <section id="projetos" data-testid="projects-section" className="bg-navy-deep py-24 text-white sm:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        id="projects"
        dark
        eyebrow="03 / Projetos e Obras"
        title="Projetos que transformamos em realidade"
        description="Nosso portfólio está sendo atualizado com registros reais das obras executadas pela Engenharia FL."
      />
      <Reveal>
        <div className="rounded-sm border border-white/15 bg-white/5 p-8 text-center sm:p-12">
          <p className="font-heading text-2xl font-bold">Portfólio em atualização</p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Em breve, esta área apresentará obras selecionadas com fotos e informações autorizadas para publicação.
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { api, resolveImg } from "../lib/api";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Section";
import { ProjectModal } from "./ProjectModal";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await api.get("/projects");

        if (active) {
          setProjects(Array.isArray(response.data) ? response.data : []);
        }
      } catch (err) {
        console.error("Erro ao carregar projetos:", err);

        if (active) {
          setProjects([]);
          setError(true);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProjects();

    return () => {
      active = false;
    };
  }, []);

  const getProjectImage = (project) => {
    const images = project?.images || {};

    return (
      images.after ||
      images.during ||
      images.before ||
      images.gallery?.[0] ||
      ""
    );
  };

  return (
    <>
      <section
        id="projetos"
        data-testid="projects-section"
        className="bg-navy-deep py-24 text-white sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            id="projects"
            dark
            eyebrow="03 / Projetos e Obras"
            title="Projetos que transformamos em realidade"
            description="Conheça alguns dos projetos e obras executados pela Engenharia FL."
          />

          {loading && (
            <div className="flex min-h-[220px] items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-blaze" />
                <p className="text-sm text-slate-400">
                  Carregando projetos...
                </p>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="rounded-sm border border-white/15 bg-white/5 p-8 text-center sm:p-12">
              <p className="font-heading text-xl font-bold text-white">
                Não foi possível carregar o portfólio
              </p>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                Nosso portfólio está temporariamente indisponível.
                Tente novamente em alguns instantes.
              </p>
            </div>
          )}

          {!loading && !error && projects.length === 0 && (
            <div className="rounded-sm border border-white/15 bg-white/5 p-8 text-center sm:p-12">
              <p className="font-heading text-xl font-bold text-white">
                Portfólio em atualização
              </p>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                Em breve, esta área apresentará obras selecionadas com fotos
                e informações autorizadas para publicação.
              </p>
            </div>
          )}

          {!loading && !error && projects.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => {
                const image = getProjectImage(project);

                return (
                  <Reveal
                    key={project.id || project._id || project.slug || index}
                    delay={Math.min(index * 0.05, 0.25)}
                    y={20}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      data-testid={`project-card-${project.slug || index}`}
                      className="group block w-full overflow-hidden rounded-sm border border-white/10 bg-white text-left shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blaze/60 hover:shadow-2xl"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
                        {image ? (
                          <img
                            src={resolveImg(image)}
                            alt={project.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-navy-card px-6 text-center">
                            <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
                              Engenharia FL
                            </span>
                          </div>
                        )}

                        {project.featured && (
                          <span className="absolute left-4 top-4 rounded-sm bg-blaze px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white">
                            Destaque
                          </span>
                        )}
                      </div>

                      <div className="p-5 sm:p-6">
                        {project.service_type && (
                          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-blaze-dark">
                            {project.service_type}
                          </p>
                        )}

                        <h3 className="mt-2 font-heading text-xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-blaze-dark">
                          {project.title}
                        </h3>

                        {(project.city || project.area) && (
                          <p className="mt-2 text-sm text-slate-500">
                            {[project.city, project.area]
                              .filter(Boolean)
                              .join(" • ")}
                          </p>
                        )}

                        {project.description && (
                          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-600">
                            {project.description}
                          </p>
                        )}

                        <div className="mt-5 border-t border-slate-100 pt-4">
                          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-navy transition-colors group-hover:text-blaze">
                            Ver projeto →
                          </span>
                        </div>
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

import { notFound } from "next/navigation";
import EpisodeListView from "../../components/EpisodeListView";
import { SERIES, getSeriesById } from "../../lib/seriesData";

export function generateStaticParams() {
  return SERIES.map((s) => ({ id: s.id }));
}

export default async function SeriesEpisodesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const series = getSeriesById(id);
  if (!series) notFound();
  return (
    <div className="h-full w-full overflow-y-auto">
      <EpisodeListView series={series} />
    </div>
  );
}

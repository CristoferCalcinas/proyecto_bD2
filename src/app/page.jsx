import TableResult from "@/components/TableResult";
import TextArea from "@/components/TextArea";
export default function Home() {
  return (
    <div className="space-y-10">
      <div>
        <TextArea />
      </div>
      <div>
        <TableResult />
      </div>
    </div>
  );
}

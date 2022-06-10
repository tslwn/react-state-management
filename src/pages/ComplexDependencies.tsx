import Button from "../components/Button";
import { useRenders } from "../hooks/use-renders";

export default function ComplexDependencies() {
  const { renders, rerender } = useRenders();

  return (
    <div className="space-y-4">
      <p>Simple versus complex dependencies.</p>
      <div>
        <Button onClick={rerender}>Re-render</Button>
        <span className="ml-4">{renders}</span>
      </div>
      <p>TODO</p>
    </div>
  );
}

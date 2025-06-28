import { useSearchParams } from "react-router-dom";
import { Select, type Option } from "./Select";

interface SortingProps {
  options: Option[];
}

export const Sorting:React.FC<SortingProps> = ({ options }) => {  
  const [searchParams, setSearchParams] = useSearchParams()
  const sortBy = searchParams.get("sortBy") || ""

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sortBy", e.target.value)
    setSearchParams(searchParams)
  }

  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}
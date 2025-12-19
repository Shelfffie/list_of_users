import { useEffect, useState, useRef } from "react";
import { userValues } from "./type";

type desplayUsersType = {
  data: userValues[];
  setNewData: React.Dispatch<React.SetStateAction<userValues[]>>;
};

export default function FilterUsers({ data, setNewData }: desplayUsersType) {
  const [inputValue, setInputValue] = useState<string>("");
  let filterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const searchableKeys: (keyof userValues)[] = [
    "name",
    "lastName",
    "email",
    "phone",
  ];

  useEffect(() => {
    if (filterTimer.current) clearTimeout(filterTimer.current);

    filterTimer.current = setTimeout(() => {
      const search: string = inputValue.trim().toLowerCase();
      if (search === "") {
        setNewData(data);
        return;
      }
      const filteredData: userValues[] = data.filter((user) =>
        searchableKeys.some((key) =>
          String(user[key]).toLowerCase().startsWith(search)
        )
      );
      setNewData(filteredData);
    }, 600);

    return () => {
      if (filterTimer.current) {
        clearTimeout(filterTimer.current);
      }
    };
  }, [inputValue, data]);

  return (
    <>
      <h2>Фільтрувати:</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </>
  );
}

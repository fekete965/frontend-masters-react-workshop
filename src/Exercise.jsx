import { useQuery } from "react-query";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";

export const Exercise = ({
  children,
  markdown,
  backLink = <Link to="/">← Home</Link>,
}) => {
  const { status, data } = useQuery(markdown, () => {
    return markdown.then((res) => res.default);
  });

  // console.log(markdown);
  return (
    <div className="exercise">
      <div className="exerciseDescription">
        {backLink}
        <Markdown>{data || "..."}</Markdown>
      </div>
      {children}
    </div>
  );
};

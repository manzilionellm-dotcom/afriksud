// components/seo/AuthorBio.tsx
// EEAT byline block. Renders an author card under the blog header so
// human readers see who's behind the article, and feeds the same
// Person data into the Article JSON-LD so Google's E-E-A-T signal
// isn't generic `Organization`.

import type { Author } from "../../lib/seo/authors";

export function AuthorBio({
  author,
  dateLabel,
}: {
  author: Author;
  dateLabel?: string;
}) {
  return (
    <div
      className="authorBio"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="authorBioMeta">
        <span className="authorBioName" itemProp="name">
          {author.name}
        </span>
        <span className="authorBioRole" itemProp="jobTitle">
          {author.role}
        </span>
        {dateLabel ? (
          <span className="authorBioDate">· {dateLabel}</span>
        ) : null}
      </div>
      <p className="authorBioText" itemProp="description">
        {author.bio}
      </p>
      {author.profiles?.length ? (
        <ul className="authorBioLinks">
          {author.profiles.map((url) => (
            <li key={url}>
              <a href={url} rel="me noreferrer" target="_blank" itemProp="sameAs">
                {new URL(url).hostname.replace(/^www\./, "")}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

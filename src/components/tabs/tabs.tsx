import type { FilmType } from '../../types/films.ts';
import { useState } from 'react';
import { tabItems, TabItem } from '../../const';
import { TabDetails } from './tab-details.tsx';
import { TabOverview } from './tab-overview.tsx';
import { TabReviews } from './tab-reviews.tsx';
type TabsProps = {
  film: FilmType;
};

function GetTabComponent(tab: TabItem, film: FilmType): JSX.Element {
  switch (tab) {
    case TabItem.Overview:
      return <TabOverview film={film} />;
    case TabItem.Details:
      return <TabDetails film={film} />;
    case TabItem.Reviews:
      return <TabReviews film={film} />;
  }
}

export function Tabs({ film }: TabsProps): JSX.Element {
  const [tab, setTab] = useState<TabItem>(TabItem.Overview);
  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {tabItems.map((item) => (
            <li className="film-nav__item" key={item}>
              <div
                onClick={() => {
                  setTab(item);
                }}
                className="film-nav__link"
              >
                {item}
              </div>
            </li>
          ))}
        </ul>
      </nav>
      {GetTabComponent(tab, film)}
    </div>
  );
}

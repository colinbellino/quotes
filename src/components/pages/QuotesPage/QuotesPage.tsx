import React, { createContext, useContext, useEffect, useRef } from "react";
import { VariableSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { PersonModel, QuoteModel } from "data";
import { MainLayout, Quote } from "components";

type QuotesPageProps = {
  loading?: boolean;
  error?: string;
  quotes?: QuoteModel[];
  persons?: PersonModel[];
};

const DynamicListContext = createContext<
  Partial<{ setSize: (index: number, size: number) => void }>
>({});

const ListRow = ({ index, width, quotes, persons, style }: any) => {
  const { setSize } = useContext(DynamicListContext);
  const rowRoot = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (rowRoot.current) {
      setSize && setSize(index, rowRoot.current.getBoundingClientRect().height);
    }
  }, [index, setSize, width]);

  const quote = quotes[index];
  const person = persons.find((person: any) => person.id === quote.author);

  return (
    <div style={{ ...style, paddingTop: 8, paddingBottom: 8 }}>
      <Quote reference={rowRoot} quote={quote} person={person} />
    </div>
  );
};

export const QuotesPage = ({
  loading = true,
  persons = [],
  quotes = [],
  error,
}: QuotesPageProps) => {
  const listRef = useRef<VariableSizeList | null>(null);
  const sizeMap = React.useRef<{ [key: string]: number }>({});

  const getSize = React.useCallback((index) => {
    return sizeMap.current[index] || 100;
  }, []);

  const setSize = React.useCallback((index: number, size: number) => {
    // Performance: Only update the sizeMap and reset cache if an actual value changed
    if (sizeMap.current[index] !== size) {
      sizeMap.current = { ...sizeMap.current, [index]: size };
      if (listRef.current) {
        // Clear cached data and rerender
        listRef.current.resetAfterIndex(0);
      }
    }
  }, []);

  // Increases accuracy by calculating an average row height
  // Fixes the scrollbar behaviour described here: https://github.com/bvaughn/react-window/issues/408
  const calcEstimatedSize = React.useCallback(() => {
    const keys = Object.keys(sizeMap.current);
    const estimatedHeight = keys.reduce((p, i) => p + sizeMap.current[i], 0);
    return estimatedHeight / keys.length;
  }, []);

  return (
    <MainLayout loading={loading} error={error}>
      <DynamicListContext.Provider value={{ setSize }}>
        <AutoSizer>
          {({ width, height }) => (
            <VariableSizeList
              ref={listRef}
              width={width}
              height={height}
              itemCount={quotes.length}
              itemSize={getSize}
              estimatedItemSize={calcEstimatedSize()}
            >
              {({ ...props }) => (
                <ListRow
                  {...props}
                  width={width}
                  quotes={quotes}
                  persons={persons}
                />
              )}
            </VariableSizeList>
          )}
        </AutoSizer>
      </DynamicListContext.Provider>
    </MainLayout>
  );
};

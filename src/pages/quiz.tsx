import Head from "next/head";

import { QuizPage } from "components";
import { useQuotes } from "data";

const QuizPageWrapper = () => {
  const { loading, error, quotes, persons } = useQuotes();

  return (
    <>
      <Head>
        <title>Quiz</title>
      </Head>
      {QuizPage({ loading, error, quotes, persons })}
    </>
  );
};

export default QuizPageWrapper;

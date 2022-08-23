import { useAppDispatch, useAppSelector } from "./store";
import { fetchCovidCases } from "./covid-cases-slice";
import { useEffect } from "react";

const App = () => {
  return (
    <div className="container mx-auto p-4 py-16 min-h-full flex items-center justify-center">
      <CovidCases />
    </div>
  );
};

export default App;

const CovidCases = () => {
  const dispatch = useAppDispatch();
  const covidCases = useAppSelector((state) => state.covidCases);

  useEffect(() => {
    dispatch(fetchCovidCases());
  }, [dispatch]);

  if (covidCases.isLoading) {
    return <span className="text-lg uppercase">Fetching Data...</span>;
  }

  if (covidCases.error) {
    return <span className="text-lg uppercase">Error fetching data :(</span>;
  }

  if (covidCases.data) {
    const { death, discharged, totalActiveCases, totalConfirmedCases } =
      covidCases.data;

    const stateCases = covidCases.data.states;

    return (
      <div className="min-h-full w-full flex flex-col gap-10 md:gap-10">
        <CovidCaseSummary
          death={death}
          discharged={discharged}
          totalActiveCases={totalActiveCases}
          totalConfirmedCases={totalConfirmedCases}
        />

        <div className="flex flex-col gap-4">
          <h2 className="text-center text-lg uppercase text-gray-600 md:text-xl">
            States
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stateCases.map(
              ({
                _id,
                casesOnAdmission,
                confirmedCases,
                death,
                discharged,
                state,
              }) => {
                return (
                  <StateCovidCase
                    key={_id}
                    state={state}
                    death={death}
                    discharged={discharged}
                    confirmedCases={confirmedCases}
                    casesOnAdmission={casesOnAdmission}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    );
  }

  return <span className="text-lg uppercase">Unknown Error :(</span>;
};

interface CovidCasesSummaryProps {
  totalConfirmedCases: number;
  totalActiveCases: number;
  discharged: number;
  death: number;
}

const CovidCaseSummary = ({
  death,
  discharged,
  totalActiveCases,
  totalConfirmedCases,
}: CovidCasesSummaryProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl md:text-3xl text-center uppercase text-gray-600">
        Nigeria Covid Cases
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col uppercase bg-green-100 gap-4 text-center p-4 px-6">
          <span>Discharged</span>
          <span className="text-4xl">{discharged.toLocaleString()}</span>
        </div>

        <div className="flex flex-col uppercase grow bg-blue-100 text-center p-4 px-6 gap-4">
          <span>Active Cases</span>
          <span className="text-4xl">{totalActiveCases.toLocaleString()}</span>
        </div>

        <div className="flex flex-col uppercase grow bg-purple-100 text-center p-4 px-6 gap-4">
          <span>Total Confirmed Cases</span>
          <span className="text-4xl">
            {totalConfirmedCases.toLocaleString()}
          </span>
        </div>

        <div className="flex flex-col uppercase grow bg-red-100 text-center p-4 px-6 gap-4">
          <span>Death</span>
          <span className="text-4xl">{death.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

interface StateCovidCaseProps {
  state: string;
  confirmedCases: number;
  casesOnAdmission: number;
  discharged: number;
  death: number;
}

const StateCovidCase = ({
  state,
  confirmedCases,
  casesOnAdmission,
  discharged,
  death,
}: StateCovidCaseProps) => {
  return (
    <div className="flex-flex-col gap-4">
      <div className="bg-slate-200 px-4 py-1">{state}</div>
      <div className="flex flex-col gap-2 p-4 border border-slate-200">
        <span>Confirmed Cases: {confirmedCases.toLocaleString()}</span>
        <span>Cases on Admission: {casesOnAdmission.toLocaleString()}</span>
        <span>Discharged: {discharged.toLocaleString()}</span>
        <span>Death: {death.toLocaleString()}</span>
      </div>
    </div>
  );
};

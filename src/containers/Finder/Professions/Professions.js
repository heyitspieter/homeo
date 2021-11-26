import className from "classnames";
import { useGetProfessions } from "src/hooks/user";
import ProfessionsSkeleton from "src/components/LoadingSkeletons/ProfessionsSkeleton";

import styles from "src/containers/Finder/Professions/Professions.module.scss";

function Professions({ jobData, currentStep, setCurrentStep, setJobData }) {
  const { data: professions, erorr, loading } = useGetProfessions();

  if (erorr || loading) {
    return <ProfessionsSkeleton />;
  }

  const containerClass = className({
    [styles.container]: true,
    [styles.translateX_out__left]: currentStep !== 0,
  });

  return (
    <div className={containerClass}>
      <div className={styles.title}>
        <h2>Choose a Profession</h2>
      </div>
      <div className={styles.grid}>
        {professions.map((profession, index) => {
          return (
            <div key={index} className={styles.grid__item}>
              <button
                onClick={() => {
                  setJobData((prevState) => ({
                    ...prevState,
                    profession: profession._id,
                  }));
                }}
                className={className({
                  [styles.selected]: jobData.profession === profession._id,
                })}
              >
                {profession.name}
              </button>
            </div>
          );
        })}
      </div>
      <div className={styles.action}>
        <button
          disabled={!jobData.profession}
          onClick={() => setCurrentStep(1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Professions;

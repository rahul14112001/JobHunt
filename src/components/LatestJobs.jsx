import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";
export default function LatestJobs() {
  const { allJobs } = useSelector((store) => store.job);
  // console.log("you are in latest jobs and it is allJobs: ", allJobs);
 
  return (
    <div className="max-w-7xl mx-auto my-20 text-center">
      <h1 className="text-4xl  font-bold">
        <span className="text-[#2d9aec]">Latest & Top</span> Job Openings
      </h1>
      {/* /* ////cards */}

      <div
        className={
          allJobs.length > 0
            ? "grid grid-cols-3 gap-4 my-5"
            : "text-center my-5"
        }
      >
        {allJobs.length <= 0 ? (
          <span className="font-bold text-red-500 text-xl italic">
            No Job Available{" "}
          </span>
        ) : (
          Array.isArray(allJobs) &&
          allJobs
            ?.slice(0, 6)
            ?.map((job) => <LatestJobCards  key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
}

import { useSelector } from "react-redux";
import { Badge } from "./ui/badge.jsx";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table.jsx";
import { Link } from "react-router-dom";

export default function AppliedJobTable() {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    // **Corrected the return statement to wrap everything in a single parent element**
    <div>
      {allAppliedJobs.length <= 0 ? (
        // **Conditional rendering is now correctly placed inside a single parent div**
        <div className="text-center">
          <div className="text-lg font-bold text-gray-500 italic mb-5">
            You have not applied any job yet 🥲
          </div>
          <Link to="/jobs" className="text-md font-bold text-blue-400 italic ">Apply Now</Link>
        </div>
      ) : (
        <div>
          <Table>
            <TableCaption className="text-red-500">
              List of your applied jobs
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium text-lg text-red-500">
                  Applied Date
                </TableHead>
                <TableHead className="font-medium text-lg text-red-500">
                  Job Role
                </TableHead>
                <TableHead className="font-medium text-lg text-red-500">
                  Company
                </TableHead>
                <TableHead className="font-medium text-lg text-red-500 text-right">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allAppliedJobs.map((appliedJob) => (
                <TableRow key={appliedJob?._id}>
                  <TableCell>{appliedJob.createdAt.split("T")[0]}</TableCell>
                  <TableCell>{appliedJob.job.title}</TableCell>
                  <TableCell>{appliedJob.job.company.name}</TableCell>
                  <TableCell className="text-right">
                    {/* **Adjusted badge background color logic** */}
                    <Badge
                      className={`${
                        appliedJob.status === "rejected"
                          ? "bg-red-500"
                          : appliedJob.status === "accepted"
                          ? "bg-green-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {appliedJob.status.toUpperCase()}
                    </Badge>{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div> // **Wrapped the entire return statement in a single div**
  );
}

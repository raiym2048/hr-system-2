import './AllVacancies.scss'
// import FilterAllVacancies from '../../components/filterAllVacancies/FilterAllVacancies'
// import AllVacanciesCard from '../../components/allVacanciesCard/AllVacanciesCard'
import FilterRespondingCandidates from "../../components/filterRespondingCandidates/FilterRespondingCandidates";
import RespondingCandidatesCard from "../../components/respondingCandidatesCard/RespondingCandidatesCard";

function AllVacancies() {
  return (
    <div className="contentAllVacancies">
      <FilterRespondingCandidates />
      <RespondingCandidatesCard />
    </div>
  )
}

export default AllVacancies

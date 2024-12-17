package at.melius.boundary;
import at.melius.model.Education;
import at.melius.model.WorkExperience;
import at.melius.repository.WorkExperienceRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;
@Path("/work-experience")
public class WorkExperienceResource {
    @Inject
    WorkExperienceRepository workExperienceRepository;

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/update")
    public WorkExperience updateWorkExperience(WorkExperience workExperience) {
        return this.workExperienceRepository.updateWorkExperience(workExperience);
    }

    @DELETE
    @Path("/delete/{id}")
    public void deleteEducation(@PathParam("id")int id) {
        this.workExperienceRepository.deleteWorkExperience(id);
    }
}
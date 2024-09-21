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

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/update")
    public void updateWorkExperience(WorkExperience workExperience) {
        this.workExperienceRepository.updateWorkExperience(workExperience);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("get/{id}")
    public List<WorkExperience> getWorkExperiencesByProfile(@PathParam("id")int profileId) {
        return workExperienceRepository.getWorkExperiencesByProfile(profileId);
    }

    @DELETE
    @Path("/delete/{id}")
    public void deleteEducation(@PathParam("id")int id) {
        this.workExperienceRepository.deleteWorkExperience(id);
    }
}

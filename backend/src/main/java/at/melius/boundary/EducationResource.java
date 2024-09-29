package at.melius.boundary;

import at.melius.model.Education;
import at.melius.repository.EducationRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/education")
public class EducationResource {

    @Inject
    EducationRepository educationRepository;

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/update")
    public void updateEducation(Education education) {
        this.educationRepository.updateEducation(education);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("get/{id}")
    public List<Education> getEducationsByProfile(@PathParam("id")int profileId) {
        return educationRepository.getEducationsByProfile(profileId);
    }

    @DELETE
    @Path("/delete/{id}")
    public void deleteEducation(@PathParam("id")int id) {
        this.educationRepository.deleteEducation(id);
    }
}

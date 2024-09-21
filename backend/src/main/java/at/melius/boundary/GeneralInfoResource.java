package at.melius.boundary;

import at.melius.model.GeneralInfo;
import at.melius.model.Profile;
import at.melius.repository.GeneralInfoRepository;
import at.melius.repository.ProfileRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("/info")
public class GeneralInfoResource {

    @Inject
    GeneralInfoRepository generalInfoRepository;

    @Inject
    ProfileRepository profileRepository;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/add")
    public GeneralInfo addGeneralInfo(GeneralInfo generalInfo) {
        return this.generalInfoRepository.addGeneralInfo(generalInfo);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/update")
    public void updateGeneralInfo(GeneralInfo generalInfo) {
        this.generalInfoRepository.updateGeneralInfo(generalInfo);
        this.profileRepository.updateProfile(generalInfo.getProfile());
    }

    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/get/{id}")
    public GeneralInfo getGeneralInfoByProfile(@PathParam("id")int id) {
        return this.generalInfoRepository.getInfoById(id);
    }
}

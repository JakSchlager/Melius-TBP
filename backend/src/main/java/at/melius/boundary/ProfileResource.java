package at.melius.boundary;

import at.melius.model.Profile;
import at.melius.repository.ProfileRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/profile")
public class ProfileResource {

    @Inject
    ProfileRepository profileRepository;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/register")
    public Profile registerProfile(Profile newProfile) {
        System.out.println(newProfile);

        return this.profileRepository.addProfile(newProfile);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/login")
    public Profile loginProfile(Profile profile) {
        if(this.profileRepository.checkProfile(profile.getEmail(), profile.getPassword())) {
            return this.profileRepository.getProfileByEmail(profile.getEmail());
        }

        throw new NotFoundException();
    }

    @PATCH
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/update")
    public void updateProfile(Profile profile) {
        this.profileRepository.updateProfile(profile);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/list")
    public List<Profile> getAllProfiles() {
        return this.profileRepository.getAllProfiles();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/get/{id}")
    public Profile getProfileById(@PathParam("id") Long id) {
        return this.profileRepository.getProfileById(id);
    }
}

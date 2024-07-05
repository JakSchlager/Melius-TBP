package at.melius.boundary;

import at.melius.model.Profile;
import at.melius.repository.ProfileRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/profile")
public class ProfileResource {

    @Inject
    ProfileRepository profileRepository;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/register")
    public Profile registerProfile(Profile newProfile) {
        System.out.println(newProfile);

        return this.profileRepository.addProfile(newProfile);
    }
}

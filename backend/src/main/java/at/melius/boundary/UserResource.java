package at.melius.boundary;

import at.melius.model.User;
import at.melius.repository.UserRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/profile")
public class UserResource {

    @Inject
    UserRepository userRepository;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/register")
    public User registerProfile(User newUser) {
        System.out.println(newUser);

        return this.userRepository.addProfile(newUser);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/login")
    public User loginProfile(User user) {
        if(this.userRepository.checkProfile(user.getEmail(), user.getPassword())) {
            return this.userRepository.getProfileByEmail(user.getEmail());
        }

        throw new NotFoundException();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/update")
    public void updateProfile(User user) {
        this.userRepository.updateProfile(user);

    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/list")
    public List<User> getAllProfiles() {
        return this.userRepository.getAllProfiles();
    }
}

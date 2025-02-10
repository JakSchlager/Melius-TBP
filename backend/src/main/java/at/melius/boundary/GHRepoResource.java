package at.melius.boundary;

import at.melius.model.GHRepo;
import at.melius.repository.GHRepoRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("/ghRepos")
public class GHRepoResource {

    @Inject
    GHRepoRepository repository;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/addAll")
    public void addAll(GHRepo[] ghRepos) {
        this.repository.addAllRepos(ghRepos);
    }

    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/deleteAll/{id}")
    public void deleteAll(@PathParam("id") int id) {
        this.repository.deleteAllRepos(id);
    }

}

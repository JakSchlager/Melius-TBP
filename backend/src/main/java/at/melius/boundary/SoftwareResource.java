package at.melius.boundary;

import at.melius.model.Software;
import at.melius.repository.SoftwareRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;

import java.util.List;

@Path("/software")
public class SoftwareResource {

    @Inject
    SoftwareRepository softwareRepository;

    @GET
    @Produces
    @Path("/get")
    public List<Software> getAllSoftwares() {
        return this.softwareRepository.getAllSoftwares();
    }
}

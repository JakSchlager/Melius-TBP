package at.melius.boundary;

import at.melius.model.SoftwareKnowledge;
import at.melius.repository.SoftwareKnowledgeRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/softw-knowledge")
public class SoftwareKnowledgeResource {

    @Inject
    SoftwareKnowledgeRepository softwareKnowledgeRepository;

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/update")
    public SoftwareKnowledge updateSoftwareKnowledge(SoftwareKnowledge softwareKnowledge) {
        return this.softwareKnowledgeRepository.updateSoftwareKnowledge(softwareKnowledge);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/get/{id}")
    public List<SoftwareKnowledge> getSoftwareKnowledgeByProfileId(@PathParam("id") int id) {
        return this.softwareKnowledgeRepository.getSoftwareKnowledgeByProfileId(id);
    }

    @DELETE
    @Path("/delete/{id}")
    public void deleteSoftwareKnowledge(@PathParam("id") int id) {
        this.softwareKnowledgeRepository.deleteSoftwareKnowledge(id);
    }
}

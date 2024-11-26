package at.melius.boundary;

import at.melius.model.ProgrammingKnowledge;
import at.melius.repository.ProgrammingKnowledgeRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/progr-knowledge")
public class ProgrammingKnowledgeResource {

    @Inject
    ProgrammingKnowledgeRepository programmingKnowledgeRepository;

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/update")
    public void updateProgrammingKnowledge(ProgrammingKnowledge programmingKnowledge) {
        this.programmingKnowledgeRepository.updateProgrammingKnowledge(programmingKnowledge);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/get/{id}")
    public List<ProgrammingKnowledge> getProgrammingKnowledgeByProfileId(@PathParam("id") int id) {
        return this.programmingKnowledgeRepository.getProgrammingKnowledgeByProfileId(id);
    }

    @DELETE
    @Path("/delete/{id}")
    public void deleteProgrammingKnowledge(@PathParam("id") int id) {
        this.programmingKnowledgeRepository.deleteProgrammingKnowledge(id);
    }

}

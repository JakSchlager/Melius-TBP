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
    public ProgrammingKnowledge updateProgrammingKnowledge(ProgrammingKnowledge programmingKnowledge) {
        return this.programmingKnowledgeRepository.updateProgrammingKnowledge(programmingKnowledge);
    }

    @DELETE
    @Path("/delete/{id}")
    public void deleteProgrammingKnowledge(@PathParam("id") int id) {
        this.programmingKnowledgeRepository.deleteProgrammingKnowledge(id);
    }

}

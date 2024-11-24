package at.melius.boundary;

import at.melius.model.ProgrammingKnowledge;
import at.melius.repository.ProgrammingKnowledgeRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/programming")
public class ProgrammingKnowledgeResource {

    @Inject
    ProgrammingKnowledgeRepository programmingKnowledgeRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/get")
    public List<ProgrammingKnowledge> getAllProgrammingknowledges() {
        return this.programmingKnowledgeRepository.getAllProgrammingKnowledges();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void addProgrammingKnowledges(ProgrammingKnowledge[] programmingKnowledges) {
        for(ProgrammingKnowledge currP: programmingKnowledges) {
            this.programmingKnowledgeRepository.addProgrammingKnowledge(currP);
        }
    }

}

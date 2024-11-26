package at.melius.boundary;

import at.melius.model.ProgrammingLanguage;
import at.melius.repository.ProgrammingLanguageRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/programming")
public class ProgrammingLanguageResource {

    @Inject
    ProgrammingLanguageRepository programmingLanguageRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/get")
    public List<ProgrammingLanguage> getAllProgrammingLanguages() {
        return this.programmingLanguageRepository.getAllProgrammingLanguages();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void addProgrammingLanguage(ProgrammingLanguage[] programmingLanguages) {
        for(ProgrammingLanguage currP: programmingLanguages) {
            this.programmingLanguageRepository.addProgrammingLanguage(currP);
        }
    }

}

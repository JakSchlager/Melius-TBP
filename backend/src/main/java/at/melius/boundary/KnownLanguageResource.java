package at.melius.boundary;

import at.melius.model.KnownLanguage;
import at.melius.repository.KnownLanguageRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/language")
public class KnownLanguageResource {

    @Inject
    KnownLanguageRepository knownLanguageRepository;

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/update")
    public KnownLanguage updateKnownLanguage(KnownLanguage language) {
        return knownLanguageRepository.updateKnownLanguage(language);
    }

    @DELETE
    @Path("/delete/{id}")
    public void deleteKnownLanguageById(@PathParam("id") int id) {
        this.knownLanguageRepository.deleteKnownLanguage(id);
    }
}

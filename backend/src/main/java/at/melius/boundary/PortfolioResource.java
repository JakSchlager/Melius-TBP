package at.melius.boundary;

import at.melius.model.Portfolio;
import at.melius.repository.PortfolioRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("/portfolio")
public class PortfolioResource {

    @Inject
    PortfolioRepository portfolioRepository;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void addPortfolio(Portfolio portfolio) {
        this.portfolioRepository.addPortfolio(portfolio);
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void updatePortfolio(Portfolio portfolio) {
        this.portfolioRepository.updatePortfolio(portfolio);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    @Transactional
    public Portfolio getPortfolio(@PathParam("id") int id) {
        return this.portfolioRepository.getPortfolioById(id);
    }
}

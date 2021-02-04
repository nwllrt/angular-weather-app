package de.niklas.backend;

import de.niklas.backend.controller.LocationsController;
import de.niklas.backend.repository.LocationsRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Collections;

@RunWith(SpringRunner.class)
@WebMvcTest(LocationsController.class)
public class LocationsRestControllerIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    LocationsRepository locationsRepository;

    @Test
    public void contextLoads() throws Exception {
        Mockito.when(locationsRepository.findAll()).thenReturn(
                Collections.emptyList()
        );

        MvcResult mvcResult = mvc.perform(
                MockMvcRequestBuilders.get("/locations")
                        .accept(MediaType.APPLICATION_JSON)
        ).andReturn();

        System.out.println(mvcResult.getResponse());

        Mockito.verify(locationsRepository).findAll();
    }
}

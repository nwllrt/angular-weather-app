package de.niklas.backend.controller;

import de.niklas.backend.model.Location;
import de.niklas.backend.repository.LocationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class LocationsController {

    @Autowired
    LocationsRepository locationsRepository;

    @GetMapping("/locations")
    public List<Location> show() {
        return locationsRepository.findAll();
    }

    @PostMapping("/locations")
    public Location add(@RequestBody final Location location) {
        return locationsRepository.save(location);
    }

    @DeleteMapping("/locations/{id}")
    public boolean delete(@PathVariable Integer id) {
        locationsRepository.deleteById(id);
        return true;
    }
}

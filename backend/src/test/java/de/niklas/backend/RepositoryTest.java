package de.niklas.backend;

import de.niklas.backend.model.Location;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.Timestamp;

@RunWith(SpringRunner.class)
@DataJpaTest
public class RepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Before
    public void setUp() {
        Location dortmund = new Location(550, "Dortmund", new Timestamp(System.currentTimeMillis()));
        entityManager.persist(dortmund);
        entityManager.flush();
    }
}

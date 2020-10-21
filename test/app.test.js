const app = require('../app')
const chai = require('chai')
const expect = chai.expect;
const supertest = require('supertest')

describe('app functionality', () => {
    it('should return a list of apps', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
            });
    });
    let sortOptions = ['Rating', 'App'];
    sortOptions.forEach(option => {
        it('should sort if query demands', () => {
            return supertest(app)
            .get(`/apps?sort=${option}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                let sorted = true;
                for(let i = 0; i < res.body.length -1; i++){
                    if(res.body[i][option] > res.body[i + 1][option]){
                        sorted = false;
                        break;
                    }
                }
                expect(sorted).to.be.true;
            })

        })
    })
    let genreOptions = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];
    genreOptions.forEach(option => {
        it('should return apps according to genre if requested', () => {
            return supertest(app)
            .get(`/apps?genres=${option}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                let genreAccurate = true;
                for(let i = 0; i <= res.body.length; i++){
                    if(!res.body[i].Genres.includes(option)) {
                        genreAccurate = false;
                        break;
                    }
                }
                expect(genreAccurate).to.be.true;
            })
        })
    });
});
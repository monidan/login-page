package login.page.grails

class BootStrap {

    def init = { servletContext ->
        new User(login: 'user', password: 'user').save()
        new User(login: 'admin', password: 'admin').save()
        new User(login: 'pasha2013', password: 'kvastaras19').save()
    }
    def destroy = {
    }
}

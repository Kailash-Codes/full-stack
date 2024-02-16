using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using minimal_try.Data;
using minimal_try.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddDbContext<ApplicationDbContext>(opt=>opt.UseSqlServer(builder.Configuration.GetConnectionString("conn")));

var app = builder.Build();
app.UseCors(opt => opt.AllowAnyOrigin());
app.UseCors(opt => opt.AllowAnyMethod());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();

#region getting all books
app.MapGet("/api/books", async(ApplicationDbContext _context) =>
{
    return await _context.Books.ToListAsync();
}).WithName("GetAllBooks").WithOpenApi();

#endregion

#region get book by id
app.MapGet("/api/book/{id}", async(int id,ApplicationDbContext _context) =>
{
    try
    {
        var matchedBook = await _context.Books.FindAsync(id);
        if (matchedBook == null)
        {
            return Results.NotFound();
        }
        else
        {
            _context.Entry(matchedBook).State = EntityState.Detached;
            return Results.Ok(matchedBook);
        }
    }catch(Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

#endregion

#region add book
app.MapPost("/api/books", async (Book book,ApplicationDbContext _context) =>
{
    try
    {

    await _context.Books.AddAsync(book);
     await _context.SaveChangesAsync();
        return Results.Ok(book);
    } 
    catch(Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }
});
#endregion

#region edit book

app.MapPatch("/api/book/${id}", async (int id, Book book, ApplicationDbContext _context) =>
{
    try
    {
        var matchedBook = await _context.Books.FindAsync(id);
        if (matchedBook == null)
        {
            return Results.NotFound();
        }
        else
        {
            // Detach the existing Book entity from the DbContext
            _context.Entry(matchedBook).State = EntityState.Detached;

            // Attach the new Book entity instance
            _context.Books.Update(book);
            await _context.SaveChangesAsync();
            return Results.Ok(book);
        }
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }
});
#endregion

#region delete book
app.MapDelete("/api/book/{id}", async (int id,ApplicationDbContext _context) =>
{
    try
    {
        var matchedBook = await _context.Books.FindAsync(id);
        if (matchedBook == null)
        {
            return Results.NotFound();
        }
        else
        {
            _context.Entry(matchedBook).State = EntityState.Detached;
            _context.Remove(matchedBook);
            await _context.SaveChangesAsync();
            return Results.Ok(matchedBook);
        }
    }
    catch(Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

#endregion
app.Run();

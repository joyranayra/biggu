<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Workshop;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class WorkshopController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/workshops/index', [
            'workshops' => Workshop::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|max:2048',
            'category' => 'nullable|string',
            'badge' => 'nullable|string',
            'date' => 'required|date',
            'time' => 'required',
            'location' => 'required|string',
            'spots_total' => 'required|integer|min:1',
            'rating' => 'nullable|numeric',
            'reviews' => 'nullable|integer',
            'difficulty' => 'nullable|string',
            'includes' => 'nullable|string',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('workshops', 'public');
        }

        Workshop::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image' => $imagePath,
            'category' => $request->category,
            'badge' => $request->badge,
            'date' => $request->date,
            'time' => $request->time,
            'location' => $request->location,
            'spots_total' => $request->spots_total,
            'spots_left' => $request->spots_total,
            'rating' => $request->rating ?? 0,
            'reviews' => $request->reviews ?? 0,
            'difficulty' => $request->difficulty,
            'includes' => json_decode($request->includes, true) ?? [],
            'created_by' => auth()->id(),
        ]);

        return back()->with('success', 'Workshop created');
    }

    public function update(Request $request, $id)
    {
        $workshop = Workshop::findOrFail($id);

        $request->validate([
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {

            if ($workshop->image) {
                Storage::disk('public')->delete($workshop->image);
            }

            $workshop->image = $request->file('image')
                ->store('workshops', 'public');
        }

        // $includes = json_decode($request->includes, true);

        $workshop->update([
            'name' => $request->name,
            'description' => $request->description,

            'price' => $request->price,

            'image' => $workshop->image,

            'category' => $request->category,
            'badge' => $request->badge,

            'date' => $request->date,
            'time' => $request->time,

            'location' => $request->location,
            'spots_total' => $request->spots_total,
            'spots_left' => $request->spots_left,

            'rating' => $request->rating,
            'reviews' => $request->reviews,

            'difficulty' => $request->difficulty,

            'includes' => json_decode($request->includes, true),
        ]);

        return back()->with('success', 'Workshop updated');
    }

    public function destroy($id)
    {
        Workshop::findOrFail($id)->delete();

        return back();
    }
}